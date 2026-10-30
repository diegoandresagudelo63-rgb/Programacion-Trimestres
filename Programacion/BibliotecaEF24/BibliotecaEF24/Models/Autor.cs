using System.ComponentModel.DataAnnotations;

namespace BibliotecaEF24.Models
{
    public class Autor
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "El nombre del autor es obligatorio.")]
        [StringLength(100)]
        public string Nombre { get; set; } = string.Empty;

        // Relación 1 a Muchos: Un autor escribe muchos libros
        public ICollection<Libro> Libros { get; set; } = new List<Libro>();
    }
}