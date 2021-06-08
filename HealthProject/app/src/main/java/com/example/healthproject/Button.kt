package com.example.healthproject

import android.content.Context
import android.graphics.Canvas
import android.graphics.drawable.Drawable
import android.util.AttributeSet
import android.view.Gravity
import androidx.appcompat.widget.AppCompatButton
import androidx.core.content.ContextCompat
import androidx.core.content.res.ResourcesCompat

class Button : AppCompatButton {

    private var enabledBackground: Drawable? = null
    private var disabledBackground: Drawable? = null
    private var txtColor: Int = 0

    constructor(context: Context) : super(context) {
        init()
    }
    constructor(context: Context, attrs: AttributeSet) : super(context, attrs) {
        init()
    }
    constructor(context: Context, attrs: AttributeSet, defStyleAttr: Int) : super(context, attrs, defStyleAttr) {
        init()
    }

    override fun onDraw(canvas: Canvas?) {
        super.onDraw(canvas)
        background = when {
            isEnabled -> enabledBackground
            else -> disabledBackground
    }
        setTextColor(txtColor)
        textSize = 14f
        gravity = Gravity.CENTER
        text = when {
            isEnabled -> "SEND"
            else -> "Fill it up"
        }
    }

    private fun init() {
        txtColor = ContextCompat.getColor(context, android.R.color.white)
        enabledBackground = ResourcesCompat.getDrawable(resources, R.drawable.button_background, null)
        disabledBackground = ResourcesCompat.getDrawable(resources, R.drawable.button_disable, null)
    }
}