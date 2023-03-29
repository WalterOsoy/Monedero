using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace BackendWallet.Models;

public partial class Account
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public string AccountType { get; set; } = null!;

    public DateTime CreationDate { get; set; }

    public decimal Amount { get; set; }

    public string? Description { get; set; }

    [JsonIgnore]
    public virtual User? User { get; set; } = null!;
}
