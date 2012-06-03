package tiksa.foodvote;

import org.apache.cordova.DroidGap;

import android.os.Bundle;

public class FoodVoteActivity extends DroidGap {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //super.setIntegerProperty("loadUrlTimeoutValue", 60000); 
        super.loadUrl("file:///android_asset/www/index.html");
    }
}