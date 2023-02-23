using Proyecto.Models;

namespace Proyecto.Services
{
    public class DataBase : IDataBase
    {
        private readonly PrograWebContext dbContext;
        public DataBase(PrograWebContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public User getUser(int id)
        {
            return dbContext.Users.FirstOrDefault(u => u.Id == id);
        }

        public List<User> listUsers()
        {
            return dbContext.Users.ToList();
        }

        public void updateUser(User user)
        {
            var existingUser = dbContext.Users.FirstOrDefault(u => u.Id == user.Id);

            if (existingUser != null)
            {
                // Update the properties of the existing user with the values from the provided user object
                existingUser.User1 = user.User1;
                existingUser.Password = user.Password;
                existingUser.LastLogin = DateTime.Now;

                // Save the changes to the database
                dbContext.SaveChanges();
            }
        }
        public bool deleteUser(int id)
        {
            var user = dbContext.Users.FirstOrDefault(u => u.Id == id);
            if (user != null)
            {
                // Remove the user from the database
                dbContext.Users.Remove(user);
                // Save the changes to the database
                dbContext.SaveChanges();
                return true;
            }
            return false;
        }

        public User addUser(User user)
        {
            // Add the new user to the database
            dbContext.Users.Add(user);
            // Save the changes to the database
            dbContext.SaveChanges();
            // Return the added user object
            return user;
        }
    }
}
