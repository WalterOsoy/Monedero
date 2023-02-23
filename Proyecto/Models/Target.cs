using System;
using System.Collections.Generic;

namespace Proyecto.Models;

public partial class Target
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public int BillId { get; set; }

    public string Description { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public int Amount { get; set; }

    public virtual Bill IdNavigation { get; set; } = null!;
}
