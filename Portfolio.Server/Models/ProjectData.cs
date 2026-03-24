using System.ComponentModel.DataAnnotations.Schema;

namespace Portfolio.Server.Models;

public class ProjectData
{
    public int Id { get; set; }
    public int Order { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string ThumbnailUrl { get; set; } = string.Empty;
    public string GithubUrl { get; set; } = string.Empty;
    public string DemoUrl { get; set; } = string.Empty;
    public List<TechData> Technologies { get; set; } = new List<TechData>();

    [NotMapped]
    public int UniqueDemoVisits { get; set; }
    
    [NotMapped]
    public int UniqueGithubVisits { get; set; }
}
