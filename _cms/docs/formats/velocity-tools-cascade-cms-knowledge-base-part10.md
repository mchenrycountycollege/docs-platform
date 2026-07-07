---
parent: Velocity Tools
section: Math Tool[](#MathTool)
part: 10 of 17
source: https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/script-formats/velocity-tools.html
title: Velocity Tools - Cascade CMS Knowledge Base
category: formats
scraped: 2026-02-16
version: cascade-cms-latest
---
# Velocity Tools - Math Tool[](#MathTool)

## Math Tool[](#MathTool)

The Math Tool (added in version 6.10) provides convenience methods for converting numeric text to real numbers and performing various mathematical operations.

Full API documentation:

-   [MathTool](https://velocity.apache.org/tools/devel/javadoc/org/apache/velocity/tools/generic/MathTool.html)

### $\_MathTool.abs[](#_MathTool_abs)

Returns the absolute value of a `number`.

Example:

`$_MathTool.abs(-3) ## Expected output: 3`

Available arguments for $\_MathTool.abs.
| Argument | Type | Description |
| --- | --- | --- |
| number | Number  
required | A number. |

### $\_MathTool.add[](#_MathTool_add)

Returns the sum of `numbers`.

Example:

`$_MathTool.add(12,30) ## Expected output: 42`

Available arguments for $\_MathTool.add.
| Argument | Type | Description |
| --- | --- | --- |
| numbers | Number  
required | Any number of Numbers. |

### $\_MathTool.ceil[](#_MathTool_ceil)

Returns the smallest integer that is not less than the given `number`.

Example:

`$_MathTool.ceil(3.14159) ## Expected output: 4`

Available arguments for $\_MathTool.ceil.
| Argument | Type | Description |
| --- | --- | --- |
| number | Number  
required | A number. |

### $\_MathTool.div[](#_MathTool_div)

Returns the quotient of `numbers` or `null` if any denominator equals zero.

Example:

`$_MathTool.div(9,3) ## Expected output: 3`

Available arguments for $\_MathTool.div.
| Argument | Type | Description |
| --- | --- | --- |
| numbers | Numbers  
required | Any number of Numbers. |

### $\_MathTool.floor[](#_MathTool_floor)

Returns the integer portion of `number`.

Example:

`$_MathTool.floor(3.14159) ## Expected output: 3`

Available arguments for $\_MathTool.floor.
| Argument | Type | Description |
| --- | --- | --- |
| number | Number  
required | A Number. |

### $\_MathTool.getRandom[](#_MathTool_getRandom)

Returns a pseudo-random Double greater than or equal to 0.0 and less than 1.0.

Example:

`$_MathTool.getRandom()`

### $\_MathTool.idiv[](#_MathTool_idiv)

Returns the result of performing integer division on `number1` and `number2`.

Example:

`$_MathTool.idiv(9.33,3.14) ## Expected output: 3`

Available arguments for $\_MathTool.idiv.
| Argument | Type | Description |
| --- | --- | --- |
| number1 | Number  
required | A Number. |
| number2 | Number  
required | A Number. |

### $\_MathTool.max[](#_MathTool_max)

Returns the maximum of `numbers`.

Example:

`$_MathTool.max(7,23,11) ## Expected output: 23`

Available arguments for $\_MathTool.max.
| Argument | Type | Description |
| --- | --- | --- |
| numbers | Numbers  
required | Any number of Numbers. |

### $\_MathTool.min[](#_MathTool_min)

Returns the minimum of `numbers`.

Example:

`$_MathTool.min(7,23,11) ## Expected output: 7`

Available arguments for $\_MathTool.min.
| Argument | Type | Description |
| --- | --- | --- |
| numbers | Numbers  
required | Any number of Numbers. |

### $\_MathTool.mod[](#_MathTool_mod)

Returns the result of performing integer modulus on `number1` and `number2`.

Example:

`$_MathTool.mod(9.33,3.14) ## Expected output: 0`

Available arguments for $\_MathTool.mod.
| Argument | Type | Description |
| --- | --- | --- |
| number1 | Number  
required | A Number. |
| number2 | Number  
required | A Number. |

### $\_MathTool.mul[](#_MathTool_mul)

Returns the product of `numbers`.

Example:

`$_MathTool.mul(6,7) ## Expected output: 42`

Available arguments for $\_MathTool.mul.
| Argument | Type | Description |
| --- | --- | --- |
| numbers | Numbers  
required | Any number of Numbers. |

### $\_MathTool.pow[](#_MathTool_pow)

Returns the result of `number1` to the power of `number2`.

Example:

`$_MathTool.pow(3,3) ## Expected output: 27`

Available arguments for $\_MathTool.pow.
| Argument | Type | Description |
| --- | --- | --- |
| number1 | Number  
required | A Number. |
| number2 | Number  
required | A Number. |

### $\_MathTool.random[](#_MathTool_random)

Returns a pseudo-random number greater than or equal to `number1` and less than `number2`.

Notes:

-   If both arguments are whole numbers then the returned number will also be, otherwise a Double will be returned.

Example:

`$_MathTool.random(1,10)`

Available arguments for $\_MathTool.random.
| Argument | Type | Description |
| --- | --- | --- |
| number1 | Number  
required | A Number. |
| number2 | Number  
required | A Number. |

### $\_MathTool.round[](#_MathTool_round)

Returns `number` rounded to the nearest whole integer.

Example:

`$_MathTool.round(3.14159) ## Expected output: 3`

Available arguments for $\_MathTool.round.
| Argument | Type | Description |
| --- | --- | --- |
| number | Number  
required | A Number. |

### $\_MathTool.roundTo[](#_MathTool_roundTo)

Returns `number` rounded to the specified number of `decimalPlaces`.

Example:

`$_MathTool.roundTo(2,3.14159) ## Expected output: 3.14`

Available arguments for $\_MathTool.roundTo.
| Argument | Type | Description |
| --- | --- | --- |
| decimalPlaces | Number  
required | The number of decimal places to round to. |
| number | Number  
required | A Number. |

### $\_MathTool.sub[](#_MathTool_sub)

Returns the difference of `numbers` (subtracted in order).

Example:

`$_MathTool.sub(10,7) ## Expected output: 3`

Available arguments for $\_MathTool.sub.
| Argument | Type | Description |
| --- | --- | --- |
| numbers | Numbers  
required | Any number of Numbers. |

### $\_MathTool.toDouble[](#_MathTool_toDouble)

Returns `number` as a Double.

Example:

`$_MathTool.toDouble(3) ## Expected output: 3.0`

Available arguments for $\_MathTool.toDouble.
| Argument | Type | Description |
| --- | --- | --- |
| number | Object  
required | Any Object. |

### $\_MathTool.toInteger[](#_MathTool_toInteger)

Returns `number` as an Integer.

Example:

`$_MathTool.toInteger(3.14159) ## Expected output: 3`

Available arguments for $\_MathTool.toInteger.
| Argument | Type | Description |
| --- | --- | --- |
| number | Object  
required | Any Object. |

### $\_MathTool.toNumber[](#_MathTool_toNumber)

Returns `number` as a Number.

Example:

`$_MathTool.toNumber("3") ## Expected output: 3`

Available arguments for $\_MathTool.toNumber.
| Argument | Type | Description |
| --- | --- | --- |
| number | Object  
required | Any Object. |
