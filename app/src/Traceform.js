/*jslint browser: true, vars: true */

// A trace form is a composition of multiple domains...
define([
    'src/DynamicLine',
    'realtimekinematics',
    'mocap'
], function (DynamicLine, Kinematics, Mocap) {
    'use strict';
    
    function Traceform() {
        // The trace to draw
        this.line = new DynamicLine();
        
        // Derives a metric for Laban "quick" and "sustained"
        this.speedStat = new Kinematics.RunningSpeedStat();
        
        // Derives a metric for Laban "direct" and "flexible / curved / indirect"
        this.directnessStat = new Kinematics.RunningLineStraightnessStat();
        
        // Derives a metric for Laban "strong" and "light"
        this.forceStat = new Kinematics.RunningImpactStat();
        
        // this.geometryRecorder = new Mocap.DataRecorder();
    }
  
    Traceform.prototype.update = function (data) {
        // Update the quickness metric
        this.speedStat.push(data.position);
        var speedMetric = this.speedStat.getMetric();
        
        // Update the directness metric
        this.directnessStat.push(data.position);
        var directnessMetric = this.directnessStat.delta();
        
        // Update the rendered line
        this.line.setPosition(data.position[0], data.position[1], data.position[2]);
        this.line.setRotation(data.rotation);
        this.line.setColor(Math.random(), Math.random(), Math.random());
        
        // this.geometryRecorder.update(data.position);
    };
  
    return Traceform;
});