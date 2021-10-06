package com.youknowapp.Filling;

import android.graphics.Color;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.views.image.ReactImageView;

public class FillingHoleViewManager extends SimpleViewManager<FillingHoleView> {
    public static final String REACT_CLASS = "FillingHoleView";
    ReactApplicationContext mCallerContext;

    public FillingHoleViewManager(ReactApplicationContext reactContext) {
        this.mCallerContext = reactContext;
    }

    @NonNull
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @NonNull
    @Override
    protected FillingHoleView createViewInstance(@NonNull ThemedReactContext reactContext) {
//        ReactImageView v = new ReactImageView(reactContext);
        return new FillingHoleView(reactContext);
    }

    @ReactProp(name = "radius", defaultFloat = 50f)
    public void setRadius(FillingHoleView fillingHoleView, int radius) {
        fillingHoleView.setRadius(radius);
    }

    @ReactProp(name = "color", defaultInt = 1)
    public void setStrokeColor(FillingHoleView fillingHoleView, int color) {
        switch (color) {
            case 1:
                fillingHoleView.setStrokeColor(Color.RED);
                return;
            case 2:
                fillingHoleView.setStrokeColor(Color.BLUE);
                return;
            default:
                fillingHoleView.setStrokeColor(Color.YELLOW);
                return;
        }
    }
}

