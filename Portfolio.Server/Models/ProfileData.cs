namespace Portfolio.Server.Models;

public class ProfileData
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public List<TechData> Technologies { get; set; } = new List<TechData>();
}
