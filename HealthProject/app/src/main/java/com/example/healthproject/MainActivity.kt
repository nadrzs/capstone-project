@file:Suppress("DEPRECATION")

package com.example.healthproject

import android.content.Intent
import android.graphics.Bitmap
import android.net.Uri
import android.os.Bundle
import android.provider.MediaStore
import android.text.Editable
import android.text.TextWatcher
import android.util.Log
import android.view.Menu
import android.view.MenuItem
import android.view.View
import android.widget.RadioButton
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.healthproject.databinding.ActivityMainBinding
import com.example.healthproject.ml.MobilenetV110224Quant
import kotlinx.android.synthetic.main.activity_main.*
import org.tensorflow.lite.DataType
import org.tensorflow.lite.support.image.TensorImage
import org.tensorflow.lite.support.tensorbuffer.TensorBuffer


class MainActivity : AppCompatActivity() {

    companion object{
        const val TAG = "tag"
        private const val CAMERA_PERMISSION_CODE = 1
        private const val CAMERA_REQUEST_CODE = 2
        private const val REQUEST_CODE = 42

    }
    private lateinit var binding: ActivityMainBinding
    private lateinit var bitmap: Bitmap
    private lateinit var button: Button
    private lateinit var editText: EditText

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        button = findViewById(R.id.btn_send)
        editText = findViewById(R.id.txt_name)

        val filename = "label.txt"
        val labels = application.assets.open(filename).bufferedReader().use {
            it.readText()
        }
        var townlist = labels.split("\n")

        float_cam.setOnClickListener {
            val take_pict = Intent(Intent.ACTION_GET_CONTENT)
            take_pict.type ="image/*"

            startActivityForResult(take_pict,100)
//            val take_pict = Intent(MediaStore.ACTION_IMAGE_CAPTURE)
//
//            if (take_pict.resolveActivity(this.packageManager) != null) {
//                startActivityForResult(take_pict, REQUEST_CODE)
//            }else {
//                Toast.makeText(this,"Unable to open camera", Toast.LENGTH_SHORT).show()
//            }
        }

        btn_send2.setOnClickListener {
            var resizedbitmap : Bitmap = Bitmap.createScaledBitmap(bitmap,224,224,true)
            var bitmapToByte = TensorImage.fromBitmap(resizedbitmap)
            var  byteBuffer = bitmapToByte.buffer

            val model = MobilenetV110224Quant.newInstance(this)

// Creates inputs for reference.
            val inputFeature0 = TensorBuffer.createFixedSize(intArrayOf(1, 224, 224, 3), DataType.UINT8)
            inputFeature0.loadBuffer(byteBuffer)

// Runs model inference and gets result.
            val outputs = model.process(inputFeature0)
            val outputFeature0 = outputs.outputFeature0AsTensorBuffer

            var max_value = getMax(outputFeature0.floatArray)
//            binding.textView.text = outputFeature0.floatArray[outputFeature0.typeSize].toString()
            binding.txtNoData.text = townlist[max_value]
// Releases model resources if no longer used.
            model.close()

        }


        setButtonEnable()

        btn_send.setOnClickListener {
            val intent = Intent(this, Result::class.java)
            startActivity(intent)
        }

        editText.addTextChangedListener(object : TextWatcher {
            override fun beforeTextChanged(s: CharSequence, start: Int, count: Int, after: Int) {
            }
            override fun onTextChanged(s: CharSequence, start: Int, before: Int, count: Int) {
                setButtonEnable()
            }
            override fun afterTextChanged(s: Editable) {
            }
        })

        setSupportActionBar(toolbar)


    }

    private fun setButtonEnable() {
        val result = editText.text
        button.isEnabled = result != null && result.toString().isNotEmpty()
    }

    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        menuInflater.inflate(R.menu.mainmenu, menu)
        return true
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        var viewItem = item.itemId

        when(viewItem) {
            R.id.action_dashboard -> Toast.makeText(applicationContext, "View Dashboard", Toast.LENGTH_SHORT).show()
            R.id.action_result -> Toast.makeText(applicationContext, "View Result", Toast.LENGTH_SHORT).show()
        }
        return false
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        img_food.setImageURI(data?.data)
        val uri: Uri? = data?.data
        try{
            bitmap = MediaStore.Images.Media.getBitmap(this.contentResolver,uri)
        }catch (e:Exception){
            Log.e(TAG, "The exception caught while executing the process. (error1) wkwkkwkwkwkwk tolol lu")
            e.printStackTrace();
        }
//        if(requestCode == REQUEST_CODE && resultCode == Activity.RESULT_OK){
//            val imageTaken = data?.extras?.get("data") as Bitmap
//            imageView.setImageBitmap(imageTaken)
//        }else {
//            super.onActivityResult(requestCode, resultCode, data)
//        }
    }

    fun onRadioButtonClicked(view: View) {
        if (view is RadioButton) {
            val checked = view.isChecked

            when (view.getId()) {
                R.id.radio_pirates ->
                    if (checked) {
                    }
                R.id.radio_ninjas ->
                    if (checked) {
                    }
            }
        }
    }

    private fun getMax(arr:FloatArray):Int{
        var index = 0
        var min = 0.0f

        for (i in 0..1000){
            if (arr[i]>min){
                index = i
                min = arr[i]
            }
        }
        return index
    }
}