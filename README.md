# Color Rush
**try it out !** https://psawa.github.io/color-rush/

Color Rush is a game of perception and speed, based on color reproduction. It is a university project created in the framework of the "Digital Imaging" teaching of my Bachelor of Applied Mathematics and Computer Science.

It is made of plain javascript, html and css.
## Rules
At each level, you have a limited amount of time to reproduce a color using sliders. But the time allowed gets shorter as you advance to higher levels.

At the end of the time limit, the distance between the color you created and the color you should have created will be computed. 
To access the next level, this distance must be lower than 20%. So the colors must look at least 80% alike.

## Game modes
The different modes allow you to choose how you will produce colors: Using the RGB, HSL, or CMY color space. These color spaces are described in more detail in the dedicated section .

## Goal
The objective is to reach level 10.

# Technical aspect
## Paradigm
This project is based on procedural and object-oriented programming. The latter type allows to create sets of variables and functions that interact with each other, notably through the Set and Get properties.

## Computation of the color-space differences
Before going into the explanations, it should be noted that whatever color space is used to produce colors on the screen, the browser will perform a conversion and display them in RGB, systematically. Distance calculations will therefore be independent of the chosen game mode.

The first method that would come to mind would be to calculate the Euclidean distance between the two points in the 3D RGB space.

<img src="https://latex.codecogs.com/gif.latex?\sqrt{(R_{1}-R_{2})&space;&plus;&space;(G_{1}-G_{2})&space;&plus;&space;(B_{1}-B_{2})}" title="\sqrt{(R_{1}-R_{2}) + (G_{1}-G_{2}) + (B_{1}-B_{2})}" />

The algorithm that would use this formula would be functional, but the game would be unplayable: Indeed, the RGB color space is not perceptually uniform for humans. This means that two colors may appear similar to us when in reality their RGB components are quite distant.

To remedy this problem, there are several formulas for calculating color distances, weighted to correspond to human perception of colors. The one used in this game was established by the International Commission on Illumination in 1976:

<img src="https://latex.codecogs.com/gif.latex?\sqrt{(L_{2}^{*}-L_{1}^{*})^{2}&space;&plus;&space;(a_{2}^{*}-a_{1}^{*})^{2}&space;&plus;&space;(b_{2}^{*}-b_{1}^{*})^{2}}" title="\sqrt{(L_{2}^{*}-L_{1}^{*})^{2} + (a_{2}^{*}-a_{1}^{*})^{2} + (b_{2}^{*}-b_{1}^{*})^{2}}" />

This formula mqkes the game pleasant to play because two colors that look similar to our human eyes are calculated as close, and vice versa. It uses the CIELAB colour space.

The game then converts the colours from RGB to CIELAB, and calculates the distance between the two CIELAB colours using the above formula. I have used functions from [antimatter15's repository](https://github.com/antimatter15/rgb-lab/blob/master/color.js) for these two features.

# Color spaces
The proposed game modes correspond to 3 color spaces: RGB, HSL, and CMY.
## RGB
The RGB (red, green, blue) color space is an additive synthesis space, in which colors are defined by their amount of red, green, and blue (the 3 additive primary colors). The particularity of an additive space is that its function is to bring colors to a black background.

RGB is a color space suitable for computer image synthesis, because the human visual system functions (almost) similarly.
## HSL
Abbreviation for Hue Saturation Lightness, the HSL space defines a color by its hue, saturation, and luminance.
This space exists because it is easier to handle than the RGB space. Color selection is more intuitive. It is a psychological approach to color synthesis.

Note that this space was originally invented during the transition from image to color: It allowed to encode images in color without profoundly modifying the already existing encoding technique: All that was needed was to add two components "hue" and "saturation" to the "light" component, which alone defined a grayscale image.

## CMY
The CMY (Cyan magenta yellow) space is contrary to RGB a subtractive space. It is mainly used in the field of printing.
The characteristic of a subtractive space is that its function is to hide a white background. The ink reduces the brightness, and prevents the white from being reflected.

In reality, printers use CMYK. The K, "key", is the black level. It is a question of economy, in order not to use the mixture of the 3 colors to form black, black which is very present in printing.

## CIELAB
L for lightness, A for Value on the green -> red axis, B for Value on the blue -> yellow axis.
In the 3D LAB space, the Euclidean distance between two colours corresponds almost exactly to the difference as seen by the human eye.
