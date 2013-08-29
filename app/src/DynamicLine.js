/*jslint vars: true, browser: true */

// A dynamic line for THREE.js.
define([
    'three',
    'sparks',
    'threex.sparks',
    'graphics/QuaternionCalculator',
    'underscore'
], function (THREE, SPARKS, THREExSparks, QuaternionCalculator, _) {
    'use strict';

    function DynamicLine(engine, options) {
        var opts = options || {};
        /*
        * Dynamic geometry is hard!
        * Vertex buffer objects have a FIXED size once created.
        * To add a new object, would have to tell GPU to destroy the VBO
        * then make a new one with some extra space to hold the new object.
        * (Extremely inefficient!)
        *
        * First take at a solution:
        *
        * So we will need to create individual points one at a time,
        * which are not part of a three.js collection.
        * However we need to store a ref to them somewhere in the app
        * so the scene manager can be told to delete them
        * when we have finished with them.
        */
        
        this.setParticleSize(opts.particleSize || 30);
        
        this.particleAcceleration = opts.particleAcceleration || new SPARKS.Accelerate(0, -0.1, 0);
        
        this.spawnRate = opts.spawnRate || 450;
        
        this.timeToLive = opts.timeToLive || 10;
        
        this.setBufferSize(opts.bufferSize || 2000);
            
        this.calculator = new QuaternionCalculator();
        
        this.sparker = new THREExSparks({
            maxParticles: this.bufferSize,
            counter: new SPARKS.SteadyCounter(this.spawnRate)
        });
        
        var emitter = this.sparker.emitter();
        
        // Starting config
        this.currentPosition = new THREE.Vector3(0, 0, 0);
        this.currentRotation = new THREE.Vector3(0, 250, 0);
        this.setColor(0.3, 0.9, 0.4);
        
        if (opts.drift) {
            this.setDrift(opts.drift.x, opts.drift.y, opts.drift.z);
        } else {
            this.setDrift(0.2, 0, 0.2);
        }
        
        var initColorSize = _.bind(function () {
            this.initialize = function (emitter, particle) {
                particle.target.color().setHSV(this.currentHSV[0], this.currentHSV[1], this.currentHSV[2]);
                particle.target.size(this.particleSize);
            };
        }, this);
        
        // Other bits
        emitter.addInitializer(new initColorSize());
        emitter.addInitializer(new SPARKS.Position(new SPARKS.PointZone(this.currentPosition)));
        // No randomness, all particles have the same TTL
        emitter.addInitializer(new SPARKS.Lifetime(this.timeToLive));
        emitter.addInitializer(new SPARKS.Velocity(new SPARKS.PointZone(this.currentRotation)));
        
        emitter.addAction(new SPARKS.Age());
        emitter.addAction(new SPARKS.Move());
        //emitter.addAction(this.randomDrift);
        emitter.addAction(this.particleAcceleration);
        
        // start the emitter
        this.sparker.emitter().start();
        // add the container to THREE.scene
        engine.addObject(this.sparker.container(), _.bind(function () {
            this.onRender();
        }, this));
    }
  
    DynamicLine.prototype.setParticleSize = function (diameter) {
        if (diameter > 0) {
            this.particleSize = diameter;
        } else {
            this.particleSize = 0;
        }
    };
  
    DynamicLine.prototype.setDrift = function (x, y, z) {
        // Only inited once
        if (this.randomDrift) {
            this.randomDrift.drift.set(x, y, z);
        } else {
            this.randomDrift = new SPARKS.RandomDrift(x, y, z);
        }
    };
  
    // Return the state of the line's geometry (vertex positions, colors etc.)
    // at this point in time
    DynamicLine.prototype.snapshot = function () {
    // TODO implement - using a web worker?
    
    
    //     var numLines = lineGeometry.vertices.length;
    
    /*for (var i = 0; i < numLines; i++) {
      // FIXME CHECK NOT ACCIDENTALLY COPYING A REFERENCE!!!!!!!!!
      var oldVertex = lineGeometry.vertices[i];
      // add it to the geometry of the new static polygon
      staticGeometry.vertices.push(oldVertex);
    }*/
    
        return this.sparker.container().geometry;
    };
  
    /*
     * The formula (or constraint):
     * bufferSize > spawnRate * timeToLive
     * If this is not satisfied
     * the sparker will run out of particles to use
     * and stop working
     * so we need a bit of logic to sanity check this
     */
    DynamicLine.prototype.setBufferSize = function (proposedSize) {
        var minSize = this.spawnRate * this.timeToLive;
        // Add extra for safety
        minSize += 0.1 * minSize;
        
        if (proposedSize < minSize) {
            this.bufferSize = minSize;
        } else {
            this.bufferSize = proposedSize;
        }
    };
  
    DynamicLine.prototype.setPosition = function (x, y, z) {
        this.currentPosition.set(x, y, z);
    };
  
    DynamicLine.prototype.setRotation = function (matrix) {
        this.currentRotation.applyQuaternion(this.calculator.quaternionFromMatrix(matrix));
    };
  
    DynamicLine.prototype.setColor = function (h, s, v) {
        this.currentHSV = [h, s, v];
    };
    
    DynamicLine.prototype.onRender = function () {
        if (this.sparker) {
            this.sparker.update();
        }
    };

    return DynamicLine;
});