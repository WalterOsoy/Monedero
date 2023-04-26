using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace BackendWallet.Models;

public partial class Token
{
    public string token { get; set; } = null!;
    public DateTime expiration { get; set; }
}
