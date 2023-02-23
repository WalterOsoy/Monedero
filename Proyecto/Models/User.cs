using System;
using System.Collections.Generic;

namespace Proyecto.Models;

public partial class User
{
    public int Id { get; set; }

    public string User1 { get; set; } = null!;

    public string Password { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public DateTime LastLogin { get; set; }
}
