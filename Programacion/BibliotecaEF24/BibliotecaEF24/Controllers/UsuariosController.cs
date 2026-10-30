
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BibliotecaEF24.Models;
using BibliotecaEF24.Data;

public class UsuariosController : Controller
{
    private readonly ApplicationDbContext _context;

    public UsuariosController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: USUARIOS
    public async Task<IActionResult> Index()
    {
        // Agregamos los Include necesarios
        var usuarios = _context.Usuarios
            .Include(u => u.TarjetaBiblioteca)
            .Include(u => u.Prestamos);

        return View(await usuarios.ToListAsync());
    }

    // GET: USUARIOS/Details/5
    public async Task<IActionResult> Details(int? id)
    {
        if (id == null)
        {
            return NotFound();
        }

        var usuario = await _context.Usuarios
            .FirstOrDefaultAsync(m => m.Id == id);
        if (usuario == null)
        {
            return NotFound();
        }

        return View(usuario);
    }

    // GET: USUARIOS/Create
    public IActionResult Create()
    {
        return View();
    }

    // POST: USUARIOS/Create
    // To protect from overposting attacks, enable the specific properties you want to bind to.
    // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create([Bind("Id,Nombre")] Usuario usuario, string tieneTarjeta)
    {
        if (ModelState.IsValid)
        {
            if (tieneTarjeta == "Si")
            {
                usuario.TarjetaBiblioteca = new TarjetaBiblioteca
                {
                    Codigo = $"TB-{Guid.NewGuid().ToString().Substring(0, 8).ToUpper()}"
                };
            }
            _context.Add(usuario);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }
        return View(usuario);
    }

    // GET: USUARIOS/Edit/5
    public async Task<IActionResult> Edit(int? id)
    {
        if (id == null)
        {
            return NotFound();
        }

        var usuario = await _context.Usuarios
            .Include(u => u.TarjetaBiblioteca)
            .FirstOrDefaultAsync(u => u.Id == id);
            
        if (usuario == null)
        {
            return NotFound();
        }
        
        ViewData["TieneTarjeta"] = usuario.TarjetaBiblioteca != null ? "Si" : "No";
        return View(usuario);
    }

    // POST: USUARIOS/Edit/5
    // To protect from overposting attacks, enable the specific properties you want to bind to.
    // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(int? id, [Bind("Id,Nombre")] Usuario usuario, string tieneTarjeta)
    {
        if (id != usuario.Id)
        {
            return NotFound();
        }

        if (ModelState.IsValid)
        {
            try
            {
                var usuarioToUpdate = await _context.Usuarios
                    .Include(u => u.TarjetaBiblioteca)
                    .FirstOrDefaultAsync(u => u.Id == id);
                    
                if (usuarioToUpdate == null) return NotFound();
                
                usuarioToUpdate.Nombre = usuario.Nombre;

                bool actualTiene = usuarioToUpdate.TarjetaBiblioteca != null;
                bool nuevoTiene = tieneTarjeta == "Si";

                if (nuevoTiene && !actualTiene)
                {
                    usuarioToUpdate.TarjetaBiblioteca = new TarjetaBiblioteca
                    {
                        Codigo = $"TB-{Guid.NewGuid().ToString().Substring(0, 8).ToUpper()}"
                    };
                }
                else if (!nuevoTiene && actualTiene)
                {
                    _context.Remove(usuarioToUpdate.TarjetaBiblioteca);
                }

                _context.Update(usuarioToUpdate);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsuarioExists(usuario.Id))
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
        ViewData["TieneTarjeta"] = tieneTarjeta;
        return View(usuario);
    }

    // GET: USUARIOS/Delete/5
    public async Task<IActionResult> Delete(int? id)
    {
        if (id == null)
        {
            return NotFound();
        }

        var usuario = await _context.Usuarios
            .FirstOrDefaultAsync(m => m.Id == id);
        if (usuario == null)
        {
            return NotFound();
        }

        return View(usuario);
    }

    // POST: USUARIOS/Delete/5
    [HttpPost, ActionName("Delete")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> DeleteConfirmed(int? id)
    {
        var usuario = await _context.Usuarios.FindAsync(id);
        if (usuario != null)
        {
            _context.Usuarios.Remove(usuario);
        }

        await _context.SaveChangesAsync();
        return RedirectToAction(nameof(Index));
    }

    private bool UsuarioExists(int? id)
    {
        return _context.Usuarios.Any(e => e.Id == id);
    }
}
