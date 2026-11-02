// Old tiling Logic
class BaseTiling {
    constructor(iterations = 1, tileSize = 100) {
        this.iterations = iterations;
        this.tileSize = tileSize;
        this.tiles = [];
        this.generate();
    }

    generate() {
        let root = [];
        const s = this.tileSize * 2 //I ain't typing allat
        //square
        const square = [ 
            createVector(0, 0),
            createVector(s, 0),
            createVector(s, s),
            createVector(0, s),
        ]
        root.push({ verts: square, cx: s/2, cy: s/2 });
        
        // octagon
        const r = s / (1 + Math.sqrt(2));
        const p = (s-r)/2;
        const oct = [ 
            createVector(p, 0),
            createVector(s-p, 0),
            createVector(s, p),
            createVector(s, s-p),
            createVector(s-p, s),
            createVector(p, s),
            createVector(0, s-p),
            createVector(0, p),
        ]
        root.push({ verts: oct, cx: s/2, cy: s/2 });
        this.tiles = root;
        for (let i = 0; i < this.iterations; i++) {
            this.subdivide(this.tiles);
        }
    }
    subdivide(tiles) {
        let splitTiles = [tiles[0]];
        tiles.shift(); // remove square

        for (let tile of tiles) {
            let c = createVector(tile.cx, tile.cy); //center
            let divs = 360 / tile.verts.length; //angle between vertices
            for (let v of tile.verts) {
                let rot1 = p5.Vector.sub(v, c).rotate(divs/2)    // rotate vector for rhombus
                let rot2 = p5.Vector.sub(v, c).rotate(-divs/2)    // rotate vector for rhombus
                let r1 = c.copy();
                let r2 = c.copy().add(rot2.mult(0.5));  // middle side of rhombas
                let r3 = v.copy();
                let r4 = c.copy().add(rot1.mult(0.5));  // corner of rhombus
                
                let rot3 = p5.Vector.sub(v, c).rotate(divs);
                let t1 = v.copy();
                let t2 = c.copy().add(rot3);  // corner of triangle
                let t3 = r4.copy();
                
                splitTiles.push({
                    verts: [r1, r2, r3, r4],
                    cx: (r1.x + r2.x + r3.x + r4.x) / 4, // center x
                    cy: (r1.y + r2.y + r3.y + r4.y) / 4, // center y
                });
                splitTiles.push({
                    verts: [t1, t2, t3],
                    cx: (t1.x + t2.x + t3.x) / 3,   // center x
                    cy: (t1.y + t2.y + t3.y) / 3   // center y
                });
            }
        }
        
        this.tiles = splitTiles;
    }
}
