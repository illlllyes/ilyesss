/**
 * Selected real Shorts linked from the public portfolio listing for MicDrop Daily.
 * Thumbnail images load from YouTube using each video's ID.
 * Edit titles/categories below any time.
 */
export type PortfolioVideo = {
  id: string
  title: string
  category: string
}

export const videos: PortfolioVideo[] = [
  { id: 'ALOv9p2iM8w', title: 'MicDrop Daily — Short 01', category: 'Short-form editing' },
  { id: 'aFIz3X3z_pM', title: 'MicDrop Daily — Short 02', category: 'Short-form editing' },
  { id: 'UM7msTxF-bE', title: 'MicDrop Daily — Short 03', category: 'Short-form editing' },
  { id: 'vceKjIwMyiM', title: 'MicDrop Daily — Short 04', category: 'Short-form editing' },
]
