using Proyecto.Models;

namespace Proyecto.Services
{
    public interface IDataBase
    {
        //crud Users
        public User addUser(User user);
        public List<User> listUsers();
        public User getUser(int id);
        public void updateUser(User user);
        public bool deleteUser(int id);
        //crud Bill
        //public User addUser(User user);
        //public List<User> listUsers();
        //public User getUser(int id);
        //public void updateUser(User user);
        //public bool deleteUser(int id);

    }
}
