using System.ComponentModel.DataAnnotations;

namespace Portfolio.Server.Models;

public class TechCategoryData
{
    [Key]
    public string Name { get; set; } = string.Empty;
}
