# Saved camera navbar and original homepage

Saved before the Struktt design experiment on October 15, 2026.

This is a complete source snapshot, including the compact navy navbar, premium 3D camera, extended lens, mouse tracking, and original homepage with the automatic story carousel. The gallery scroll-mask implementation is also included.

## Camera settings

- Desktop camera scale: 0.88; mobile: 0.76.
- Resting angle: 30 degrees right.
- Active tracking: 10 degrees right plus pointer direction times 32 degrees; the camera can still turn left.
- Lens: 16 barrel layers, front glass at 36px depth.
- Navbar padding: 5px vertically.

## Restore

From the project root in PowerShell:

```powershell
./docs/camera-navbar-backup/restore.ps1
npm.cmd run build
```

The script restores the six saved frontend files. New experimental files may remain on disk but will no longer be imported. It does not modify dependencies or publish anything.

`manifest.json` records SHA-256 checksums of the saved source files. The logo image was not available when this snapshot was created; the saved navbar includes its existing brand-name fallback.
