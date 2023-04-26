using BackendWallet.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BackendWallet.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly IConfiguration configuration;
        private readonly WalletContext db;
        public LoginController(IConfiguration _configuration)
        {
            this.configuration = _configuration;
            db = new WalletContext();
        }

        [HttpPost("login")]
        public ActionResult<User> Login(string userName, string password)
        {
            var user = db.Users.FirstOrDefault(u => u.UserName == userName);
            if (user == null)
            {
                return NotFound("Usuario no existe");
            }
            // Verify the password using bcrypt
            if (!BCrypt.Net.BCrypt.Verify(password, user.Password))
            {
                return Unauthorized("Password");
            }
            return Ok(GetAllProperties());
        }

        [HttpPost("register")]
        public ActionResult<User> Register(User newUser)
        {
            var existingUser = db.Users.FirstOrDefault(u => u.UserName == newUser.UserName);
            if (existingUser != null)
            {
                return BadRequest("El usuario ya existe");
            }
            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(newUser.Password);

            // Create new user
            newUser.Password = hashedPassword;
            db.Users.Add(newUser);
            db.SaveChanges();

            return Ok(GetAllProperties());
        }


        private Token GetAllProperties()
        {
            Token tokenRequest = new Token { token = "string", expiration = DateTime.Now };
            DateTime expiration = DateTime.Now.AddMinutes(30);
            string applicationName = "CPAPI";
            string tk = CustomTokenJWT(applicationName, expiration);
            return new Token() { token = tk, expiration = expiration };
        }

        private string CustomTokenJWT(string ApplicationName, DateTime token_expiration)
        {
            var _symmetricSecurityKey = new SymmetricSecurityKey(
              Encoding.UTF8.GetBytes(configuration["JWT:SecretKey"])
            );
            var _signingCredentials = new SigningCredentials(
              _symmetricSecurityKey, SecurityAlgorithms.HmacSha256
            );
            var _Header = new JwtHeader(_signingCredentials);
            var _Claims = new[] {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.NameId, ApplicationName)
            };
            var _Payload = new JwtPayload(
              issuer: configuration["JWT:Issuer"],
              audience: configuration["JWT:Audience"],
              claims: _Claims,
              notBefore: DateTime.Now,
              expires: token_expiration
            );
            var _Token = new JwtSecurityToken(
              _Header,
              _Payload
            );
            return new JwtSecurityTokenHandler().WriteToken(_Token);
        }
    }
}