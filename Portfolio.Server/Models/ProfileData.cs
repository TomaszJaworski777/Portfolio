namespace Portfolio.Server.Models;

public class ProfileData
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string PhotoUrl { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string GithubUsername { get; set; } = string.Empty;
    public string LinkedinProfile { get; set; } = string.Empty;
    public string CvUrl { get; set; } = string.Empty;
    public string CvName { get; set; } = string.Empty;
    public List<TechData> Technologies { get; set; } = new List<TechData>();
}
