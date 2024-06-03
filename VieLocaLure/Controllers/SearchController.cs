using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;
using VieLocaLure.Data;
using VieLocaLure.Models;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using static Microsoft.Extensions.Logging.EventSource.LoggingEventSource;

namespace VieLocaLure.Controllers
{
    [Route("api/search")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        private readonly VieLocaLureDB _db;

        public SearchController(VieLocaLureDB db)
        {
            _db = db;
        }


        [HttpGet]
        //tham số ? không xuất hiện khi không có key
        public ActionResult<IEnumerable<Object>> SearchTours(
        [FromQuery(Name = "keywords")] string keywords = "",
        [FromQuery(Name = "from")] DateTime? from = null,
        [FromQuery(Name = "to")] DateTime? to = null,
        [FromQuery(Name = "area")] int? area = null)
        {
            IQueryable<Tour> query = _db.tours;

            if (!string.IsNullOrEmpty(keywords))
            {
                keywords = keywords.ToLower();
                query = query.Where(p => p.title_vi.ToLower().Contains(keywords) || p.title_en.ToLower().Contains(keywords));
            }

            if (from.HasValue)
            {
                query = query.Where(p => p.TourDetail.Any(x => x.departureDate >= from));
            }

            if (to.HasValue)
            {
                query = query.Where(p => p.TourDetail.Any(y => y.departureDate <= to));
            }

            if (area.HasValue)
            {
                query = query.Where(p => p.TourDestination.Any(z => z.Destination.Province.AreaId == area));
            }
            var tours = query.Include(d => d.TourDetail)
                            .Include(d => d.TourDestination)
                            .ThenInclude(t => t.Destination)
                            .ThenInclude(td => td.Image)
                            .Select(d => new TourProvinceDTO
                            {
                                title_en = d.TourDestination.FirstOrDefault().Destination.name_en,
                                title_vi = d.TourDestination.FirstOrDefault().Destination.name_vi,
                                image = d.TourDestination.FirstOrDefault().Destination.Image.FirstOrDefault().url,
                                duration_en = d.duration_en,
                                duration_vi = d.duration_vi,
                                transport_en = d.transport_en,
                                transport_vi = d.transport_vi,
                                description_en = d.content_en,
                                description_vi = d.content_vi,
                                adultPrice = d.TourDetail.FirstOrDefault().adultPrice,
                                childPrice = d.TourDetail.FirstOrDefault().childPrice,
                                infantPrice = d.TourDetail.FirstOrDefault().infantPrice,
                                schedule = d.TourDetail.Select(td => td.departureDate).ToList()
                            })
                            .ToList();

            return Ok(tours);
        }
        /*private readonly string _modelPath = "vgg16_v2.onnx";
        private readonly string _featuresPath = "features.pkl";

        [HttpPost("/search/image")]
        public async Task<IActionResult> SearchImage([FromForm] IFormFile imageFile)
        {
            if (imageFile == null || imageFile.Length == 0)
            {
                return BadRequest("Please upload an image file.");
            }

            try
            {
                // Load model and features (assuming these are loaded once on application startup)
                var session = CBIR.LoadModel(_modelPath);
                var inputSize = (224, 224);
                var features = CBIR.LoadFeatureVector();

                // Preprocess uploaded image
                using (var stream = imageFile.OpenReadStream())
                {
                    var image = await Cv2.ImReadAsync(stream);
                    var preprocessedImage = CBIR.PreprocessImage(image, inputSize);

                    // Extract features from the image
                    var featureVector = CBIR.ExtractFeatures(session, preprocessedImage);

                    // Find similar images
                    var similarImages = CBIR.FindSimilarImages(featureVector, features, 5);

                    // Prepare and return response data
                    return Ok(similarImages.Select(result => new
                    {
                        Path = result.Item1,
                        Similarity = result.Item2
                    }));
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error searching image: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }
    }
    public static class CBIR
    {
        private const string ModelPath = "vgg16_v2.onnx";
        private const string FeaturesPath = "features.pkl";

        public static NDArrayView PreprocessImage(string imagePath, (int, int) inputSize)
        {
            using (var image = Cv2.ImRead(imagePath))
            {
                Cv2.Resize(image, image, new OpenCvSharp.Size(inputSize.Item1, inputSize.Item2));
                image.ConvertTo(image, MatType.CV_32F, 1.0 / 255.0);
                Cv2.Transpose(image, image);
                return image.Reshape(1, 3, inputSize.Item1, inputSize.Item2);
            }
        }

        public static float[] ExtractFeatures(InferenceSession session, NDArrayView image)
        {
            var inputMeta = session.InputMetadata;
            var outputMeta = session.OutputMetadata;

            var inputs = new List<NamedOnnxValue>
        {
            NamedOnnxValue.CreateFromTensor(inputMeta.Keys.First(), image)
        };

            using var results = session.Run(inputs);
            var resultTensor = results.First().AsTensor<float>();
            var featureVector = resultTensor.ToArray();
            var norm = (float)Math.Sqrt(featureVector.Sum(x => x * x));

            for (var i = 0; i < featureVector.Length; i++)
            {
                featureVector[i] /= norm;
            }

            return featureVector;
        }

        public static InferenceSession LoadModel(string modelPath)
        {
            return new InferenceSession(modelPath);
        }

        public static List<(string, float[])> LoadFeatureVector()
        {
            try
            {
                using var file = File.OpenRead(FeaturesPath);
                var formatter = new System.Runtime.Serialization.Formatters.Binary.BinaryFormatter();
                return (List<(string, float[])>)formatter.Deserialize(file);
            }
            catch (Exception)
            {
                return new List<(string, float[])>(); // Return empty list if features not found
            }
        }

        public static float CosineSimilarity(float[] a, float[] b)
        {
            var dotProduct = a.Zip(b, (x, y) => x * y).Sum();
            var normA = Math.Sqrt(a.Sum(x => x * x));
            var normB = Math.Sqrt(b.Sum(y => y * y));
            return (float)(dotProduct / (normA * normB));
        }

        public static List<(string, float)> FindSimilarImages(float[] queryVector, List<(string, float[])> featureVectors, int topK = 5)
        {
            var similarities = new List<(string, float)>();

            foreach (var (imagePath, featureVector) in featureVectors)
            {
                var similarity = 100 * CosineSimilarity(queryVector, featureVector);
                similarities.Add((imagePath, similarity));
            }

            similarities = similarities.OrderByDescending(s => s.Item2).ToList();
            return similarities.Take(topK).ToList();
        }
    }*/
    }
}
