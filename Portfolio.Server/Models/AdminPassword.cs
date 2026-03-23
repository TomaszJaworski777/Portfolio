namespace Portfolio.Server.Models;

public class AdminPassword
{
    public int Id { get; set; }
    public string PasswordHash { get; set; } = string.Empty;
}
