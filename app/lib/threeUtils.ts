// threeUtils.ts
import * as THREE from 'three'

export function snapToCenter(index: number, total: number): number {
  // Calculates angular offset to bring item to center
  const angle = (index / total) * Math.PI * 2
  return angle
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

export function getPosition(angle: number, radius: number): THREE.Vector3 {
  return new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius)
}
export function getRotation(angle: number): THREE.Euler {
  return new THREE.Euler(0, -angle, 0)
}
export function getScale(active: boolean): number {
  return active ? 1.3 : 1
}
export function getColor(active: boolean): string {
  return active ? 'hotpink' : 'white'
}
export function getCursorStyle(active: boolean): string {
  return active ? 'pointer' : 'default'
}
export function getTetrahedronPosition(index: number, total: number, radius: number): THREE.Vector3 {   
  const angle = (index / total) * Math.PI * 2
  return new THREE.Vector3(Math.cos(angle) * radius, -1.5, Math.sin(angle) * radius)
}
export function getTetrahedronRotation(index: number, total: number): THREE.Euler {                 
  const angle = (index / total) * Math.PI * 2
  return new THREE.Euler(0, -angle, 0)
}
export function getTetrahedronScale(active: boolean): number {
  return active ? 0.3 : 0.2
}
export function getTetrahedronColor(active: boolean): string {
  return active ? '#00ffff' : '#0088ff'
}
export function getTetrahedronEmissive(active: boolean): string {
  return active ? '#00ffff' : '#0088ff'
}
export function getTetrahedronEmissiveIntensity(active: boolean): number {
  return active ? 1.5 : 0.5
}
export function getTetrahedronCursorStyle(active: boolean): string {
  return active ? 'pointer' : 'default'
}
export function getTetrahedronOnClick(active: boolean): () => void {
  return active ? () => console.error('Tetrahedron clicked!') : () => {}
}
export function getTetrahedronOnPointerOver(active: boolean): () => void {
  return active ? () => (document.body.style.cursor = 'pointer') : () => {}
}
export function getTetrahedronOnPointerOut(active: boolean): () => void {
  return active ? () => (document.body.style.cursor = 'default') : () => {}
}
export function getTetrahedronOnClickHandler(active: boolean): () => void {
  return active ? () => console.error('Tetrahedron clicked!') : () => {}
}
export function getTetrahedronOnPointerOverHandler(active: boolean): () => void {
  return active ? () => (document.body.style.cursor = 'pointer') : () => {}
}
export function getTetrahedronOnPointerOutHandler(active: boolean): () => void {
  return active ? () => (document.body.style.cursor = 'default') : () => {}
}
