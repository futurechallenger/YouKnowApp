package com.youknowapp.Filling;

import android.os.Looper;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.Timer;

public class FillingEventHole extends ReactContextBaseJavaModule {
    FillingEventHole(ReactApplicationContext context) {
        super(context);
    }

    @NonNull
    @Override
    public String getName() {
        return "FillingHoleModule";
    }

    @ReactMethod
    public void sendEventInSeconds(long seconds, Promise promise) {
        Log.d("FillEventHole", "Event from native comes in" + seconds);
        try {
            new android.os.Handler(Looper.getMainLooper()).postDelayed(new Runnable() {
                @Override
                public void run() {
                    WritableMap params = Arguments.createMap();
                    params.putString("filling", "hole");
                    params.putString("with", "RN");
                    FillingEventHole.this.sendEvent("FillingHole", params);
                }
            }, seconds * 1000);

            promise.resolve("Done");
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    private void sendEvent(String eventName, @Nullable WritableMap params) {
        this.getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, params);
    }
}
