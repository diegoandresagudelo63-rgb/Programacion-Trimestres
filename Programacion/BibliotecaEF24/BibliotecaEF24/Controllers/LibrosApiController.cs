using BibliotecaEF24.Data;
using BibliotecaEF24.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BibliotecaEF24.Controllers
{
    [ApiController]
    [Route("api/libros")]
    public class LibrosApiController : ControllerBase
    {
        private readonly ApplicationDbContext _contexto;

        public LibrosApiController(ApplicationDbContext contexto)
        {
            _contexto = contexto;
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetLibro(int id)
        {
            var libro = await _contexto.Libros
                .Include(l => l.Autor)
                .FirstOrDefaultAsync(l => l.Id == id);

            if (libro == null)
            {
                return NotFound();
            }

            return Ok(libro);
        }

        [HttpGet]
        public async Task<IActionResult> GetLibros()
        {
            var libros = await _contexto.Libros
                .Include(l => l.Autor)
                .ToListAsync();

            return Ok(libros);
        }


        [HttpPost]
        public async Task<IActionResult> CrearLibro(Libro libro)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _contexto.Libros.Add(libro);

            await _contexto.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetLibro),
                new { id = libro.Id },
                libro
            );
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditarLibro(int id, Libro libro)
        {
            if (id != libro.Id)
            {
                return BadRequest();
            }

            var libroDb = await _contexto.Libros.FindAsync(id);

            if (libroDb == null)
            {
                return NotFound();
            }

            libroDb.Titulo = libro.Titulo;
            libroDb.AutorId = libro.AutorId;

            await _contexto.SaveChangesAsync();

            return Ok(libroDb);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> EliminarLibro(int id)
        {
            var libro = await _contexto.Libros.FindAsync(id);

            if (libro == null)
            {
                return NotFound();
            }

            _contexto.Libros.Remove(libro);

            await _contexto.SaveChangesAsync();

            return NoContent();
        }


    }
}
