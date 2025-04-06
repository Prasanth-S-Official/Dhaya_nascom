import { supabase } from './supabase'

export interface FormSubmission {
  title: string
  description: string
  file: File
}

export async function submitForm(data: FormSubmission) {
  try {
    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError) throw userError
    if (!user) throw new Error('No user logged in')

    // Create form data
    const formData = new FormData()
    formData.append('userId', user.id)
    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('file', data.file)

    // Get function URL from Supabase
    const { data: { functionUrl }, error: urlError } = await supabase.functions.invoke('handle-form')
    if (urlError) throw urlError

    // Get the session for authentication
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    if (sessionError) throw sessionError
    if (!session) throw new Error('No session found')

    // Submit the form
    const response = await fetch(functionUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
      },
      body: formData,
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to submit form')
    }

    return await response.json()
  } catch (error) {
    console.error('Error submitting form:', error)
    throw error
  }
} 