using Microsoft.AspNetCore.Mvc;
using System.Reflection;

namespace BackApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReflectionController : ControllerBase
    {
        [HttpGet("importers")]
        public IActionResult GetImporters()
        {
            string reflectionPath = Path.Combine(Directory.GetCurrentDirectory(), "reflection");

            if (!Directory.Exists(reflectionPath))
                return Ok(new List<string>());

            var assemblies = new List<Assembly>();

            // 🔹 Cargar todas las DLLs primero
            foreach (var dllPath in Directory.GetFiles(reflectionPath, "*.dll"))
            {
                try
                {
                    assemblies.Add(Assembly.LoadFrom(dllPath));
                }
                catch
                {
                    // ignorar DLLs no válidas
                }
            }

            var result = new List<string>();

            // 🔹 Analizar cada assembly después
            foreach (var assembly in assemblies)
            {
                try
                {
                    bool hasImporter = assembly.GetTypes().Any(t =>
                        t.IsClass &&
                        !t.IsAbstract &&
                        t.GetInterfaces().Any(i => i.FullName == "IImporter.ImporterInterface"));

                    if (hasImporter)
                        result.Add(Path.GetFileName(assembly.Location));
                }
                catch
                {
                    // ignorar errores de reflexión
                }
            }

            return Ok(result);
        }
    }
}