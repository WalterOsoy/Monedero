using BackendWallet.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackendWallet.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly WalletContext db;
        public UsersController()
        {
            db = new WalletContext();
        }
        
        [HttpGet("{UserName}")]
        public User GetOne(string UserName, int id)
        {
            var user = db.Users.FirstOrDefault(u => u.UserName == UserName);
            if (user == null)
            {
                return null;
            }
            return user;
        }
        [HttpGet("")]
        public List<User> GetAll()
        {
            var user = db.Users.ToList();
            if (user == null)
            {
                return null;
            }
            return user;
        }

        [HttpPost("")]
        public ActionResult<User> AddOne(User body)
        {
            var user = db.Users.FirstOrDefault(u => u.UserName == body.UserName);
            user.Name = body.Name;  
            user.UserName = body.UserName; 
            user.Password = body.Password;  
            user.LastName = body.LastName;    
            user.LastLoginDate = DateTime.Now;
            user.CreationDate = body.CreationDate;
            db.Users.Update(body);
            db.SaveChanges();
            return body;
        }
        [HttpDelete("{UserName}")]
        public User DeleteOne(string UserName, int id)
        {
            var user = db.Users.FirstOrDefault(u => u.UserName == UserName);
            if (user == null)
            {
                return null;
            }
            db.Users.Remove(user);
            db.SaveChanges();
            return user;
        }
    }
}
