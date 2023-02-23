using System;
using System.Collections.Generic;

namespace Proyecto.Models;

public partial class Bill
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public string Title { get; set; } = null!;

    public string Description { get; set; } = null!;

    public string Bank { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public int Amount { get; set; }

    public virtual Target? Target { get; set; }
}
