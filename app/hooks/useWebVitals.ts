'use client';

import { useEffect } from 'react';
import { getCLS, getFCP, getLCP, getTTFB } from 'web-vitals';

export function useWebVitals() {
  useEffect(() => {
    // First Contentful Paint
    getFCP((metric) => {
      console.log('📊 FCP:', Math.round(metric.value), 'ms');
      if (metric.value > 1800) {
        console.warn('⚠️ FCP is slow! Consider optimizing critical resources.');
      }
    });

    // Largest Contentful Paint
    getLCP((metric) => {
      console.log('📊 LCP:', Math.round(metric.value), 'ms');
      if (metric.value > 2500) {
        console.warn('⚠️ LCP is slow! Optimize images and defer non-critical content.');
      }
    });

    // Cumulative Layout Shift
    getCLS((metric) => {
      console.log('📊 CLS:', metric.value.toFixed(3));
      if (metric.value > 0.1) {
        console.warn('⚠️ CLS is high! Fix layout shifts during page load.');
      }
    });

    // Time to First Byte
    getTTFB((metric) => {
      console.log('📊 TTFB:', Math.round(metric.value), 'ms');
      if (metric.value > 600) {
        console.warn('⚠️ TTFB is slow! Optimize server response time.');
      }
    });
  }, []);
}
