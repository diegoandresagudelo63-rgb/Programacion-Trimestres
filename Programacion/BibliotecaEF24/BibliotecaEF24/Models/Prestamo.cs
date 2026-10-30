using BibliotecaEF24.Models;
using System.ComponentModel.DataAnnotations;

namespace BibliotecaEF24.Models
{
    public class Prestamo
    {
        public int Id { get; set; }

        [DataType(DataType.Date)]
        public DateTime FechaPrestamo { get; set; } = DateTime.Now;

        [DataType(DataType.Date)]
        public DateTime? FechaDevolucion { get; set; }

        [Required(ErrorMessage = "Debe seleccionar un usuario.")]
        public int UsuarioId { get; set; }
        public Usuario? Usuario { get; set; }

        [Required(ErrorMessage = "Debe seleccionar un libro.")]
        public int LibroId { get; set; }
        public Libro? Libro { get; set; }
    }
}