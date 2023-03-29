using BackendWallet.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackendWallet.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly WalletContext db;

        public AccountController()
        {
            db = new WalletContext();
        }
        
        [HttpGet("{UserName}/{id}")]
        public Account GetOne(string UserName, int id)
        {
            var user = db.Users.FirstOrDefault(u => u.UserName == UserName);
            if (user == null)
            {
                return null;
            }
            var account = db.Accounts.FirstOrDefault(a => a.UserId == user.Id && a.Id == id);
            if (account == null)
            {
                return null;
            }
            return account;
        }

        [HttpGet("{UserName}")]
        public List<Account> GetAll(string UserName)
        {
            var user = db.Users.FirstOrDefault(u => u.UserName == UserName);
            if (user == null)
            {
                return null;
            }
            return db.Accounts.Where(a => a.UserId == user.Id).ToList();
        }
        
        [HttpPost("")]
        public ActionResult<Account> AddOne(Account body)
        {
            body.CreationDate = DateTime.Now;
            db.Accounts.Add(body);
            db.SaveChanges();
            return body;
        }

        [HttpDelete("{UserName}/{id}")]
        public Account DeleteOne(string UserName, int id)
        {
            var user = db.Users.FirstOrDefault(u => u.UserName == UserName);
            if (user == null)
            {
                return null;
            }
            var account = db.Accounts.FirstOrDefault(a => a.UserId == user.Id && a.Id == id);
            if (account == null)
            {
                return null;
            }
            db.Accounts.Remove(account);
            db.SaveChanges();
            return account;
        }
        [HttpDelete("{UserName}")]
        public IActionResult DeleteAll(string UserName )
        {
            var user = db.Users.FirstOrDefault(u => u.UserName == UserName);
            if (user == null)
            {
                return null;
            }
            var accounts = db.Accounts.Where(a => a.UserId == user.Id).ToList();
            foreach (var account in accounts)
            {
                db.Accounts.Remove(account);
            }
            db.SaveChanges();
            return Ok(null);
        }
    }
}
