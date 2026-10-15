$ErrorActionPreference = 'Stop'
$backupDirectory = $PSScriptRoot
$projectDirectory = [IO.Path]::GetFullPath((Join-Path $backupDirectory '../..'))
$frontendDirectory = Join-Path $projectDirectory 'frontend'
$manifest = Get-Content -LiteralPath (Join-Path $backupDirectory 'manifest.json') -Raw | ConvertFrom-Json
foreach ($entry in $manifest.PSObject.Properties) {
    $source = Join-Path (Join-Path $backupDirectory 'frontend') $entry.Name
    $destination = [IO.Path]::GetFullPath((Join-Path $frontendDirectory $entry.Name))
    if (-not $destination.StartsWith($frontendDirectory + [IO.Path]::DirectorySeparatorChar)) {
        throw 'Restore destination must stay inside frontend.'
    }
    if ((Get-FileHash -LiteralPath $source -Algorithm SHA256).Hash.ToLowerInvariant() -ne $entry.Value) {
        throw "Backup checksum mismatch: $($entry.Name)"
    }
    Copy-Item -LiteralPath $source -Destination $destination -Force
}
Write-Output 'Restored the saved camera navbar and homepage. Run npm.cmd run build to validate.'
