package com.youknowapp.Filling;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.util.AttributeSet;
import android.util.Log;
import android.view.View;

import androidx.annotation.Nullable;

public class FillingHoleView extends View {
    private Paint mPaint;
    private float mRadius;
    private int mBgColor;

    public FillingHoleView(Context context) {
        super(context);
        this.init();
    }

    public FillingHoleView(Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
        this.init();
    }

    public void init() {
        mPaint = new Paint();
        mPaint.setColor(Color.RED);
    }

    public float getRadius() {
        return mRadius;
    }

    public void setRadius(float radius) {
        this.mRadius = radius;
        this.invalidate();
    }

    public int getBackgroundColor() {
        return mBgColor;
    }

    public void setBackgroundColor(int color) {
        this.mBgColor = color;
        this.mPaint.setColor(color);
        this.invalidate();
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);

        int paddingLeft = getPaddingLeft();
        int paddingRight = getPaddingRight();
        int paddingTop = getPaddingTop();
        int paddingBottom = getPaddingBottom();

        int width = getWidth() - paddingLeft - paddingRight;
        int height = getHeight() - paddingTop - paddingBottom;
        canvas.drawCircle(width / 2, height / 2, mRadius, mPaint);
    }

    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        int widthMode = MeasureSpec.getMode(widthMeasureSpec);
        int widthSize = MeasureSpec.getSize(widthMeasureSpec);
        int heightMode = MeasureSpec.getMode(heightMeasureSpec);
        int heightSize = MeasureSpec.getSize(heightMeasureSpec);

        if (widthMode == MeasureSpec.AT_MOST) {
            widthSize = (int) (mRadius * 2) + getPaddingLeft() + getPaddingRight();
            Log.d("FillingHoleView", "width: " + widthSize);
        }

        if (heightMode == MeasureSpec.AT_MOST) {
            heightSize = (int) (mRadius * 2) + getPaddingTop() + getPaddingBottom();
            Log.d("FillingHoleView", "height: " + widthSize);
        }

        setMeasuredDimension(widthSize, heightSize);
    }
}
