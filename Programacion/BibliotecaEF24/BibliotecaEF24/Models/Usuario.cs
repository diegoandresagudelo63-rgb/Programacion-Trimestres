using BibliotecaEF24.Models;
using System.ComponentModel.DataAnnotations;

namespace BibliotecaEF24.Models
{
    public class Usuario
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "El nombre del usuario es obligatorio.")]
        [StringLength(100, ErrorMessage = "El nombre no puede exceder 100 caracteres.")]
        public string Nombre { get; set; } = string.Empty;

        public TarjetaBiblioteca? TarjetaBiblioteca { get; set; }
        public List<Prestamo> Prestamos { get; set; } = new();
    }
}