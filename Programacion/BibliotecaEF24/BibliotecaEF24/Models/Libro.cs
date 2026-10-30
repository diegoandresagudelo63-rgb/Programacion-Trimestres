using System.ComponentModel.DataAnnotations;

namespace BibliotecaEF24.Models
{
    public class Libro
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "El título es obligatorio.")]
        [StringLength(150)]
        public string Titulo { get; set; } = string.Empty;

        // Clave foránea de Autor (Relación 1:N)
        [Display(Name = "Autor")]
        public int AutorId { get; set; }
        public Autor? Autor { get; set; }

        // Relación Muchos a Muchos con Categorías
        public ICollection<Categoria> Categorias { get; set; } = new List<Categoria>();

        // Relación 1:N con Préstamos
        public ICollection<Prestamo> Prestamos { get; set; } = new List<Prestamo>();
    }
}