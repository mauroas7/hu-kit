<#
.SINOPSIS
    Copia las skills de hu-kit a las skills de usuario de Claude Code.

.DESCRIPCION
    Por defecto instala en %USERPROFILE%\.claude\skills\, donde Claude Code
    las encuentra en cualquier proyecto sin que ninguno las versione. Con
    -Destino instala en .claude\skills\ de un proyecto, que tiene que estar en
    su .gitignore. Solo toca las subcarpetas de skills/ que trae hu-kit.

.EJEMPLO
    C:\laragon\www\hu-kit\instalar.ps1
    C:\laragon\www\hu-kit\instalar.ps1 -Destino C:\laragon\www\quirofanohu
#>
param(
    [string]$Destino
)

$origen = Join-Path $PSScriptRoot 'skills'

if ($Destino) {
    $destinoSkills = Join-Path (Resolve-Path $Destino) '.claude\skills'
} else {
    $destinoSkills = Join-Path $env:USERPROFILE '.claude\skills'
}

if (-not (Test-Path $origen)) {
    Write-Error "No se encontro $origen"
    exit 1
}

New-Item -ItemType Directory -Force -Path $destinoSkills | Out-Null

Get-ChildItem -Path $origen -Directory | ForEach-Object {
    $nombre = $_.Name
    $destinoSkill = Join-Path $destinoSkills $nombre

    Write-Host "Copiando $nombre -> $destinoSkill"
    robocopy $_.FullName $destinoSkill /MIR /NFL /NDL /NJH /NJS | Out-Null
    # robocopy devuelve 0-7 para exito (bits de "copio archivos", "borro
    # extras", etc.) y solo 8+ es una falla real.
    if ($LASTEXITCODE -ge 8) {
        Write-Error "robocopy fallo copiando $nombre (codigo $LASTEXITCODE)"
        exit 1
    }
}

$global:LASTEXITCODE = 0

Write-Host ""
Write-Host "Listo: skills en $destinoSkills"
