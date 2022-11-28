const CELSIUS_DIFF = 273.15

export const formatToCelsius = (kelvin: number) => {
  const celsius = kelvin - CELSIUS_DIFF
  return Number(celsius.toFixed(1))
}
