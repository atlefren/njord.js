The need for a vanilla JS, client side lib for lightweight geoprocessing
========================================================================

Background
----------

There is an abundance of open source geoprocessing libs for various programming languages, most notably the Java-based JTS and it's derivatives, such as.

- JTS (Java): <http://www.vividsolutions.com/jts/JTSHome.htm>
- Geos (C++): <http://trac.osgeo.org/geos/>
- nettopologysuite (C#): <https://code.google.com/p/nettopologysuite/>
- Shapely (Python): <https://pypi.python.org/pypi/Shapely>
- Jsts (JavaScript): <https://github.com/bjornharrtell/jsts>

(And possibly a bunch more, please fill in)

All of these (exept Jsts) works with server-side languages, which is mostly fine. However, with the surge in JavaScript popularity and complicated Single Page Apps (both generally and in the GIS domain) there is a need to aviod round-tripping to the server for doing geoprocessing tasks such as intersections, buffering etc.

Although Jsts exists and works its implementation bears strong marks of beeing a port of (the Java) JTS library. This makes the library neither lightweight nor easy to use for JavaScript developers. 

Because of this there have been some previous attempts to create a more JavaScript "native" geoprocessing lib, such as [shapely.js] [1] and [turf] [2]. However, shapely.js is abandoned (last commit 11 months ago) and imcomplete, while turf is aimed at node.js (and thus server side), it's browser variant is currently not working. Turf also depends on jsts, which kind of defies the purpose.

[1]: https://github.com/chelm/shapely.js/
[2]: https://github.com/morganherlocker/turf


The rise of Njord.js
--------------------

As described above, the need for an open sourde, client side library for lightweight geoprocessing is abviously there. Chris Helm, author of shapely.js, has expressed interest in collaborating on such a library, and I (Atle Frenvik Sveen) also wish to make this happen.

### Features
The main goal should be to replicate the functionality of JTS, but done so in a modern, lightweight and easy-to use way that is compatible with sensible JavaScript practices. 

### Coding style
The [Node.js style guide][nodestyle] is a good starting point.

[nodestyle]: https://github.com/felixge/node-style-guide

### Technology
Njord is to be based as mush as possible on [vanilla js] [vanillajs], with the possible inclusion of the utility library [Underscore.js] [underscorejs]. For testing the great [buster.js] [busterjs] library is an option. 

Other than that grunt (or gulp) is a great idea.


[vanillajs]: http://vanilla-js.com/
[underscorejs]: http://underscorejs.org
[busterjs]: http://docs.busterjs.org/en/latest/


### Timeframe
That's the tricky part!

### The name
Njord is a god in norse mythology, associated with sea, seafaring, wind, fishing, wealth, and crop fertility ([wikipedia] [3]). While this is nice and all, but Njord is also the name of a supercomputer at the university where atlefren graduated ([link][4]). The computer is installed in what used to be the reading room where he spent his first years on the university, manually doing geoprocessing tasks ;).

[3]: http://en.wikipedia.org/wiki/Nj%C3%B6r%C3%B0r
[4]: http://www.ntnu.edu/research/labs/supercomputing

### Lisence
The proposed library is to be released under the MIT-lisence.



API
---

###Coordinates
Is just a Pojo with: x and y (and optionally z):
    
    var coord = {x: 1, y: 1, z: 1};

####Bounds: 
A pojo with top, left, right, bottom:
    
    var bounds = {left: 1, top: 1, right: 2, bottom: 2};

###Geometries

####Base features:

*Creation*:

    //from coord
    var geom1 = new N.Point(coord);
    
    //from wkt
    var geom2 = new N.Point().fromWKT(wktString);
    
    //from GeoJSON
    var geom3 = new N.Point().fromGeoJSON(geoJson);

*Basic operations*: 
  
    geom.area();
    geom.length();
    geom.bounds();
    geom.type(); //gets the type
    geom.distance(geom2);
    geom.repr(); //reperesentative point

####Primitives

*Point*
    
    new N.Point({x: 1, y: 1});

*LineString*
  
    new N.LineString([{x: 1, y: 1}, {x: 2, y: 2}]);

*LinearRing*
  
    new N.LinearRing([{x: 1, y: 1}, {x: 2, y: 2}, {x: 3, y: 3}]);

*Polygon*
  
    new N.Polygon([{x: 1, y: 1}, {x: 2, y: 2}, {x: 3, y: 3}], [[]]);


####Collections

*MultiPoint*

*MultiLineString*

*MultiPolygon*


