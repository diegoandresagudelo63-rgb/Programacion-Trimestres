using BibliotecaEF24.Models;
using Microsoft.EntityFrameworkCore;

namespace BibliotecaEF24.Data // Tu carpeta es Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        // Aquí le decimos a Entity Framework qué tablas crear
        public DbSet<Autor> Autores { get; set; }
        public DbSet<Libro> Libros { get; set; }
        public DbSet<Categoria> Categorias { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<TarjetaBiblioteca> TarjetasBiblioteca { get; set; }
        public DbSet<Prestamo> Prestamos { get; set; }
    }
}