namespace Portfolio.Server.Models;

public class ProfileData
{
    public string Name { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public List<TechData> Languages { get; set; } = new List<TechData>();
    public List<TechData> Frameworks { get; set; } = new List<TechData>();
    public List<TechData> Tools { get; set; } = new List<TechData>();
    public List<TechData> Databases { get; set; } = new List<TechData>();
    public List<TechData> DevOps { get; set; } = new List<TechData>();
}
