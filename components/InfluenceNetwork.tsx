import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import node from "postcss/lib/node";
import { links } from "~/root";

interface Node {
  id: number;
  name: string;
}

interface Link {
  source: number;
  target: number;
}

interface NetworkGraphProps {
  nodes: Node[];
  links: Link[];
}

const data: NetworkGraphProps = {
  nodes: [
    {
      'id': 1,
      'name': "A"
    },
    {
      "id": 2,
      "name": "B"
    },
    {
      "id": 3,
      "name": "C"
    },
    {
      "id": 4,
      "name": "D"
    },
    {
      "id": 5,
      "name": "E"
    },
    {
      "id": 6,
      "name": "F"
    },
    {
      "id": 7,
      "name": "G"
    },
    {
      "id": 8,
      "name": "H"
    },
    {
      "id": 9,
      "name": "I"
    },
    {
      "id": 10,
      "name": "J"
    }
  ],
  "links": [

    {
      "source": 1,
      "target": 2
    },
    {
      "source": 1,
      "target": 5
    },
    {
      "source": 1,
      "target": 6
    },

    {
      "source": 2,
      "target": 3
    },
    {
      "source": 2,
      "target": 7
    }
    ,

    {
      "source": 3,
      "target": 4
    },
    {
      "source": 8,
      "target": 3
    }
    ,
    {
      "source": 4,
      "target": 5
    }
    ,

    {
      "source": 4,
      "target": 9
    },
    {
      "source": 5,
      "target": 10
    }
  ]
};


const NetworkGraph: React.FC<NetworkGraphProps> = ({ nodes, links }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current);
      const width = 800;
      const height = 600;

      const link = svg.selectAll("line")
        .data(links)
        .enter()
        .append("line")
        .style("stroke", "#aaa");

      const node = svg.selectAll("circle")
    .data(nodes)
    .enter()
    .append("circle")
      .attr("r", 20)
        .style("fill", "#69b3a2")        .call(d3.drag()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended)
        );;
           
      node.append('title')
        .text((d: any) => d.name);      
      
      const simulation = d3.forceSimulation(nodes)                 // Force algorithm is applied to data.nodes
        .force("link", d3.forceLink()                            // This force provides links between nodes
          .id(function (d) { return d.id; })                     // This provide  the id of a node
          .links(links)                                    // and this the list of links
        )
        .force("charge", d3.forceManyBody().strength(-400))         // This adds repulsion between nodes. Play with the -400 for the repulsion strength
        .force("center", d3.forceCenter(width / 2, height / 2));     // This force attracts nodes to the center of the svg area

      simulation.on('tick', () => {
        link
          .attr('x1', (d: any) => d.source.x)
          .attr('y1', (d: any) => d.source.y)
          .attr('x2', (d: any) => d.target.x)
          .attr('y2', (d: any) => d.target.y);

        node
          .attr('cx', (d: any) => d.x)
          .attr('cy', (d: any) => d.y);
      });      

      function dragstarted(event: any, d: any) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(event: any, d: any) {
        d.fx = event.x;
        d.fy = event.y;
      }

      function dragended(event: any, d: any) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }      
    }
  }, [nodes, links]);

  return <svg ref={svgRef} width={800} height={600} />;
};


const InfluenceNetwork: React.FC = () => {
  return (
    <NetworkGraph {...data} />
  );
};




export default InfluenceNetwork;
