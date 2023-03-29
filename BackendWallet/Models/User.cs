using System;
using System.Collections.Generic;

namespace BackendWallet.Models;

public partial class User
{
    public int Id { get; set; }

    public string UserName { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public DateTime? LastLoginDate { get; set; }

    public DateTime CreationDate { get; set; }

    public virtual ICollection<Account>? Accounts { get; } = new List<Account>();
}
