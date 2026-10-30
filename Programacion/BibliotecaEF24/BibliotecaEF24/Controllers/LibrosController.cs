
using BibliotecaEF24.Data;
using BibliotecaEF24.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

public class LibrosController : Controller
{
    private readonly ApplicationDbContext _context;

    public LibrosController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: Libros
    public async Task<IActionResult> Index()
    {
        // Carga los Libros junto con la información de su Autor y Categorías
        var librosConAutor = _context.Libros.Include(l => l.Autor).Include(l => l.Categorias);
        return View(await librosConAutor.ToListAsync());
    }

    // GET: LIBROS/Details/5
    public async Task<IActionResult> Details(int? id)
    {
        if (id == null)
        {
            return NotFound();
        }

        var libro = await _context.Libros
            .FirstOrDefaultAsync(m => m.Id == id);
        if (libro == null)
        {
            return NotFound();
        }

        return View(libro);
    }

    // GET: LIBROS/Create
    public IActionResult Create()
    {
        ViewData["AutorId"] = new SelectList(_context.Autores, "Id", "Nombre");
        ViewData["Categorias"] = new MultiSelectList(_context.Categorias, "Id", "Nombre");
        return View();
    }

    // POST: LIBROS/Create
    // To protect from overposting attacks, enable the specific properties you want to bind to.
    // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create([Bind("Id,Titulo,AutorId")] Libro libro, int[] selectedCategorias)
    {
        if (ModelState.IsValid)
        {
            if (selectedCategorias != null)
            {
                libro.Categorias = await _context.Categorias.Where(c => selectedCategorias.Contains(c.Id)).ToListAsync();
            }
            _context.Add(libro);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }
        ViewData["AutorId"] = new SelectList(_context.Autores, "Id", "Nombre", libro.AutorId);
        ViewData["Categorias"] = new MultiSelectList(_context.Categorias, "Id", "Nombre", selectedCategorias);
        return View(libro);
    }

    // GET: LIBROS/Edit/5
    public async Task<IActionResult> Edit(int? id)
    {
        if (id == null)
        {
            return NotFound();
        }

        var libro = await _context.Libros.Include(l => l.Categorias).FirstOrDefaultAsync(l => l.Id == id);
        if (libro == null)
        {
            return NotFound();
        }
        
        ViewData["AutorId"] = new SelectList(_context.Autores, "Id", "Nombre", libro.AutorId);
        ViewData["Categorias"] = new MultiSelectList(_context.Categorias, "Id", "Nombre", libro.Categorias.Select(c => c.Id));
        return View(libro);
    }

    // POST: LIBROS/Edit/5
    // To protect from overposting attacks, enable the specific properties you want to bind to.
    // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(int? id, [Bind("Id,Titulo,AutorId")] Libro libro, int[] selectedCategorias)
    {
        if (id != libro.Id)
        {
            return NotFound();
        }

        if (ModelState.IsValid)
        {
            try
            {
                var libroToUpdate = await _context.Libros.Include(l => l.Categorias).FirstOrDefaultAsync(l => l.Id == id);
                if (libroToUpdate == null) return NotFound();
                
                libroToUpdate.Titulo = libro.Titulo;
                libroToUpdate.AutorId = libro.AutorId;
                
                libroToUpdate.Categorias.Clear();
                if (selectedCategorias != null)
                {
                    var cats = await _context.Categorias.Where(c => selectedCategorias.Contains(c.Id)).ToListAsync();
                    foreach (var cat in cats) libroToUpdate.Categorias.Add(cat);
                }

                _context.Update(libroToUpdate);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LibroExists(libro.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return RedirectToAction(nameof(Index));
        }
        ViewData["AutorId"] = new SelectList(_context.Autores, "Id", "Nombre", libro.AutorId);
        ViewData["Categorias"] = new MultiSelectList(_context.Categorias, "Id", "Nombre", selectedCategorias);
        return View(libro);
    }

    // GET: LIBROS/Delete/5
    public async Task<IActionResult> Delete(int? id)
    {
        if (id == null)
        {
            return NotFound();
        }

        var libro = await _context.Libros
            .FirstOrDefaultAsync(m => m.Id == id);
        if (libro == null)
        {
            return NotFound();
        }

        return View(libro);
    }

    // POST: LIBROS/Delete/5
    [HttpPost, ActionName("Delete")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> DeleteConfirmed(int? id)
    {
        var libro = await _context.Libros.FindAsync(id);
        if (libro != null)
        {
            _context.Libros.Remove(libro);
        }

        await _context.SaveChangesAsync();
        return RedirectToAction(nameof(Index));
    }

    private bool LibroExists(int? id)
    {
        return _context.Libros.Any(e => e.Id == id);
    }
}
