package com.example.healthproject

import android.os.Bundle
import android.view.Menu
import android.view.MenuItem
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import kotlinx.android.synthetic.main.activity_main.*

class Result : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_result)

        setSupportActionBar(toolbar)
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
}