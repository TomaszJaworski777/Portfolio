namespace Portfolio.Server.Models;

public class TechData
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string IconUrl { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string LightColor { get; set; } = string.Empty;
    public string DarkColor { get; set; } = string.Empty;
}
