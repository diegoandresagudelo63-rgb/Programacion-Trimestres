using BibliotecaEF24.Models;
using System.ComponentModel.DataAnnotations;

namespace BibliotecaEF24.Models // ¡Asegúrate de que diga BibliotecaEF24!
{
    public class TarjetaBiblioteca
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "El código de la tarjeta es obligatorio.")]
        public string Codigo { get; set; } = string.Empty;

        public int UsuarioId { get; set; }
        public Usuario? Usuario { get; set; }
    }
}