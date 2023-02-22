using Microsoft.AspNetCore.Mvc;

namespace Proyecto.Controllers
{
    public class LoginController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
